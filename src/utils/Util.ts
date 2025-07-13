class Util {
    async FileToUrlBase64(file: any): Promise<any> {
        try {
            if (file) {
                return new Promise((resolve, reject)=> {
                    const reader = new FileReader()
                    reader.onload = e => {
                        const dataURL = reader.result;
                        resolve(dataURL)
                    }
                    reader.readAsDataURL(file)
                })
            }
        } catch (err) {
            console.log('Error al crear datos!', err)
        }
        return new Promise((resolve, reject)=>{
            resolve("")
        })
    }
}

export const UtilInstance = new Util()
Object.freeze(UtilInstance)