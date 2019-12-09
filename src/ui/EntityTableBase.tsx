import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { EntityLogicBase } from "../businessLogic/EntityLogicBase";

interface HasId {
    id?: number;
}

interface IState<T extends HasId> {
    entities: T[];
}

export default class EntityTableBase<T extends HasId> extends React.Component<
    RouteComponentProps,
    IState<T>
> {
    protected entityLogic: EntityLogicBase<T>;

    constructor(props: RouteComponentProps, entityLogic: EntityLogicBase<T>) {
        super(props);
        this.entityLogic = entityLogic;
        this.state = { entities: [] };
    }

    public componentDidMount(): void {
        this.entityLogic.getAll().then(data => {
            this.setState({ entities: data });
        });
    }

    public deleteEntity(id: number) {
        this.entityLogic.delete(id).then(() => {
            const index = this.state.entities.findIndex(entity => entity.id === id);
            this.state.entities.splice(index, 1);
            this.setState({ entities: this.state.entities });
        });
    }

    public async generateEntity() {
        let random: T = await this.entityLogic.generateRandom();

        this.entityLogic.add(random).then(entity => {
            console.log("Random entity added");
            console.log(entity);
            this.state.entities.push(entity);
            this.setState({ entities: this.state.entities });
        });
    }
}
