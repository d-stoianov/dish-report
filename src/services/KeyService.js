export class KeyCollection {
    constructor(keys) {
        this.keys = keys
    }

    someErrors() {
        return this.keys.some(k => k.status != 200)
    }

    allErrors() {
        return this.keys.every(k => k.status != 200)
    }

    keyForDepartment(department) {
    	return this.keys.find(k => k.department == department)
    }
}

export class Key {
    constructor(department, value, status) {
        this.department = department
        this.value = value
        this.status = status
    }
}

export class KeyService {
	saveKeys(keys) {
		localStorage.setItem("keyCollection", JSON.stringify(keys))
	}

	loadKeys(keys) {
		if (!this.hasKeys()) {
			return new KeyCollection([])
		}
		const raw = JSON.parse(localStorage.getItem("keyCollection"))
		return new KeyCollection(raw.keys.map(k => {
			return new Key(k.department, k.value, k.status)
		}))
	}

	clearKeys() {
		localStorage.removeItem("keyCollection")
	}

	hasKeys() {
		return !!localStorage.getItem("keyCollection")
	}
}