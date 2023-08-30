class DishReportService {
    constructor () {
        this.baseUrl = "https://d-stoianov.github.io/dish-report-stage"
    }

    async login(username, password) {
        // do some fetch with username and password parameters

        const response =  {
            "name": "Odesa",
            "serviceUrl": "http://blablasomeurl.com",
            "httpCode": 200,
            "message": "Success"
        }
        return response
    }

    async logout() {
        // do some fetch

        const response =  {
            "name": "Odesa",
            "serviceUrl": "http://blablasomeurl.com",
            "httpCode": 200,
            "message": "Success"
        }
        return response
    }

    async getDishOverview() {
        const res = await fetch(this.baseUrl + "/data.json")
        const data = await res.json()

        return data.dishes[0].dishOverview
    }

    async getDishDetails() {
        const res = await fetch(this.baseUrl + "/data.json")
        const data = await res.json()

        return data.dishes[1].dishDetails
    }
}

export default DishReportService