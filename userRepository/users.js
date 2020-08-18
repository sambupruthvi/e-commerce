const fs = require('fs');

class UserRepository{
    constructor(filename){
        if (!filename) {
            throw new Error("creating repository requires a filename");
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (error) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll(){
        // open filename called this.filename
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        );
    }

    async create(attr){
        const records = await this.getAll();
        records.push(attr);
        await fs.promises.writeFile(this.filename, JSON.stringify(records));
    }
}
const test = async () => {
    const repo = new UserRepository('users.json');
    await repo.create({email: "test@test.com", password: "password"});
    const data = await repo.getAll();
    console.log(data);
}
test().catch(console.error);
