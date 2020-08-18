const fs = require('fs');
const crypto = require('crypto');

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
        attr.id = this.randomId();
        const records = await this.getAll();
        records.push(attr);
        await this.writeAll(records);
    }

    async writeAll(records){
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    async getOne(id){
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    randomId(){
        return crypto.randomBytes(5).toString('hex');
    }
}
const test = async () => {
    const repo = new UserRepository('users.json');
    // await repo.create({email: "test@test.com", password: "password"});
    // const data = await repo.getAll();
    const data = await repo.getOne('1c200ed303');
    console.log(data);
}
test().catch(console.error);
