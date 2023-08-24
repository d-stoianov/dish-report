class DishReportService {
    constructor () {
        this.baseUrl = "https://d-stoianov.github.io/dish-report-stage"
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