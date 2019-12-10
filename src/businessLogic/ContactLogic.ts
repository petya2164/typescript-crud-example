import * as faker from "faker";

import { Contact } from "../interfaces/Contact";
import { EntityLogicBase } from "./EntityLogicBase";

export class ContactLogic extends EntityLogicBase<Contact> {
    getCollectionName(): string {
        return "contacts";
    }

    /**
     * Special function to generate an entity with random data
     */
    async generateRandom(): Promise<Contact> {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        let contact: Contact = {
            firstName: firstName,
            lastName: lastName,
            role: faker.name.jobType(),
            email: faker.internet.email(firstName, lastName),
            phone: faker.phone.phoneNumber("###-####")
        };

        return contact;
    }
}
