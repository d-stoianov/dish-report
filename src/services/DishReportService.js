import config from "@/services/service.config.json"
import sha1 from "sha1"
import { KeyCollection, Key } from "@/services/KeyService"

class OverviewReport {
    constructor(items, errors) {
        this.items = items
        this.errors = errors
    }

    hasData() {
       return this.items.some(i => {
            return i.hasData
        })
    }
}

class OverviewReportItem {
    constructor(department, group, dishes, hasData) {
        this.department = department
        this.group = group
        this.dishes = dishes
        this.hasData = hasData
    }
}

class OverviewReportDish {
    constructor(id, name, cost) {
        this.id = id
        this.name = name
        this.cost = cost
    }
}

class DishReportService {
    async login(username, password) {
        const keys = []
        for (let i = 0; i < config.length; i++) {
            const configItem = config[i]
            const baseUrl = configItem.baseUrl
            const department = configItem.department
            try {
                const response = await fetch(`${baseUrl}/auth?login=${username}&pass=${sha1(password)}`)

                if (response.status === 200) {
                    const key = await response.text()
                    keys.push(new Key(department, key, response.status))
                } else {
                    keys.push(new Key(department, "", response.status))
                }
            } catch (error) {
                keys.push(new Key(department, "", response.status))
            }
        }

        return new KeyCollection(keys)
    }

    async logout(keys) {
        for (let i = 0; i < config.length; i++) {
            const configItem = config[i]
            const baseUrl = configItem.baseUrl
            const department = configItem.department
            const key = keys.keyForDepartment(department)
            try {
                const response = await fetch(`${baseUrl}/logout?key=${key.value}`)

                if (response.status != 200) {
                    console.log(`${baseUrl}/logout?key=${key.value}: ${response.status}`)
                }
            } catch (error) {
                console.log(`${baseUrl}/logout?key=${key.value}: ${response.status}`)
            }
        }

        return true
    }

    async getDishOverview(keys) {
        const items = []
        const errors = []

        for (let i = 0; i < config.length; i++) {
            const configItem = config[i]
            const baseUrl = configItem.baseUrl
            const groupFieldName = configItem.groupFieldName

            const department = configItem.department
            const key = keys.keyForDepartment(department)

            const columnFields = config[i].groupFieldName ? ["DishName", "DishId", config[i].groupFieldName] : ["DishName", "DishId"]

            const currentTime = new Date()
            const fromDate = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000) // last week
            const fromDateString = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, "0")}-${String(fromDate.getDate()).padStart(2, "0")}`

            const body = {
                "reportType": "SALES",
                "groupByColFields": columnFields,
                "aggregateFields": [
                    "ProductCostBase.Percent"
                ],
                "filters": {
                    "OpenDate.Typed": {
                        "filterType": "DateRange",
                        "periodType": "LAST_WEEK",
                        "from": fromDateString,
                    }
                }
            }

            const response = await fetch(`${baseUrl}/v2/reports/olap/?key=${key.value}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })


            if (response.status != 200) {
                errors.push({ department: department, status: response.status })
                continue
            }

            const data = (await response.json()).data

            if (groupFieldName) {
                const grouppedData = data.reduce((groups, item) => {
                    const groupName = item[groupFieldName]
                    groups[groupName] = groups[groupName] ?? []
                    groups[groupName].push(item)
                    return groups
                }, {})

                for (let group in grouppedData) {
                    let sortedDishes = grouppedData[group]
                    .sort((a, b) => {
                        return b["ProductCostBase.Percent"] - a["ProductCostBase.Percent"] // sort descending
                    })
                    .slice(0, 10) // get first 10 elements
                    .map(item => {
                        return new OverviewReportDish(
                            item["DishId"],
                            item["DishName"],
                            item["ProductCostBase.Percent"]
                        )
                    })
                    items.push(new OverviewReportItem(department, group, sortedDishes, sortedDishes.length > 0))
                }
            }
        }
        const result = new OverviewReport(items)
        console.log(result)
        return result
    }
}

export default DishReportService