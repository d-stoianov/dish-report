import config from "@/services/service.config.json"
import sha1 from "sha1"

class OverviewReportCollection {
    constructor(department, group, dishes) {
        this.department = department
        this.group = group
        this.dishes = dishes
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
        const baseUrl = config[0].baseUrl
        try {
            const response = await fetch(`${baseUrl}/auth?login=${username}&pass=${sha1(password)}`)

            const key = await response.text()
            return {response, key}
        } catch (error) {
            throw error
        }
    }

    async logout(key) {
        const baseUrl = config[0].baseUrl

        try {
            const response = await fetch(`${baseUrl}/logout?key=${key}`)

            return response
        } catch (error) {
            throw error
        }
    }

    async getDishOverview(key) {
        const result = []

        const departments = await this.getDepartments(key)

        for (let i = 0; i < config.length; i++) {
            const configItem = config[i]
            const baseUrl = configItem.baseUrl
            const groupFieldName = configItem.groupFieldName

            const columnFields = config[i].groupFieldName ? ["DishName", "DishId", config[i].groupFieldName] : ["DishName", "DishId"]

            function addPadding(num) {
                if (num < 10) {
                    return String("0" + num)
                } return num
            }

            const currentTime = new Date()
            const fromDate = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000) // last week
            const fromDateString = `${fromDate.getFullYear()}-${addPadding(fromDate.getMonth())}-${addPadding(fromDate.getDate())}`

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

            const response = await fetch(`${baseUrl}/v2/reports/olap/?key=${key}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })

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

                    result.push(new OverviewReportCollection(departments[0], group, sortedDishes))
                }
            }
            console.log(result)
            return result
        }
    }

    async getDepartments(key) {
        const departments = []

        const baseUrl = config[0].baseUrl
        const response = await fetch(`${baseUrl}/corporation/departments/?key=${key}`)
        
        const text = await response.text()
        
        const doc = new DOMParser().parseFromString(text, "text/xml")
        const department = doc.evaluate("/corporateItemDtoes/corporateItemDto[1]/name/text()", doc).iterateNext().data

        departments.push(department)

        return departments
    }
}

export default DishReportService