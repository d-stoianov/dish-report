class DishReportService {
    constructor () {
        this.baseUrl = "https://d-stoianov.github.io/dish-report-stage"
    }

    async getDishOverview() {
        const res = await fetch(this.baseUrl + "/data.json")
        const data = await res.json()
        return data.dishOverview
    }
}

export default DishReportService