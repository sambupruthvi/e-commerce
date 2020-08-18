const fs = require('fs');

class UserRepository{
    constructor(filename){
        if (!filename) {
            throw new Error("creating repository requires a filename");
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename)
        } catch (error) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll(){
        // open filename called this.filename
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
        // // read its contents
        // console.log(contents);
        // // parse the contents
        // const data = JSON.parse(contents);
        // // Return the parsed data
        // return data;
    }
}
const test = async () => {
    const repo = new UserRepository('users.json');
    const data = await repo.getAll();
    console.log(data);
}
test();
