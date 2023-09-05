import config from "@/services/service.config.json"
import sha1 from "sha1"

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
        const baseUrl = config[0].baseUrl

        const body = {
            "reportType": "SALES",
            "groupByColFields": [
                "DishName",
                "DishId",
                "RestorauntGroup" // groupFieldName, optional
            ],
            "aggregateFields": [
                "ProductCostBase.Percent"
            ],
            "filters": {
                "OpenDate.Typed": {
                    "filterType": "DateRange",
                    "periodType": "LAST_WEEK",
                    "from": "2023-09-02", // 7 days ago
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


        const data = await response.json()
        console.log(data.data)
        const dishes = data.data.sort((a, b) => {
            return b["ProductCostBase.Percent"] - a["ProductCostBase.Percent"] // sort descending
        }).slice(0, 10) // get first 10 elements

        return dishes
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