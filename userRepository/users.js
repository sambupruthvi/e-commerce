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

    async delete(id){
        const records = await this.getAll();
        const filterdRecords = records.filter(record => record.id !== id);
        await this.writeAll(filterdRecords);
    }

    async update(id, attr){
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) {
            throw new Error(`record with id ${id} not found`);
        }
        Object.assign(record, attr); //this updates the record we found with the new attributes.
        await this.writeAll(records);
    }

    async getOneBy(filters){
        const records = await this.getAll();
        for (const record of records) {
            let found = true;
            for (const key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            if (found) {
                return record;
            }
        }
    }
    randomId(){
        return crypto.randomBytes(5).toString('hex');
    }
}
// const test = async () => {
//     const repo = new UserRepository('users.json');
//     // await repo.create({email: "test@test.com", password: "password"});
//     // const data = await repo.getAll();
//     // const data = await repo.delete('3ab69c5af6');
//     // await repo.update('e7f21beb4', {email: "check@check.com", password: "newpassword"});
    
//     const data = await repo.getOneBy({email: "test@test.com", password: "password"});
//     console.log(data);
// }
// test()

module.exports = new UserRepository('users.json');
