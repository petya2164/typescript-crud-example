import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { EntityLogicBase } from "../businessLogic/EntityLogicBase";

interface HasId {
    id?: number;
}

export interface IFormState<T extends HasId> {
    id: number;
    entity: Partial<T>;
    submitSuccess: boolean;
    loading: boolean;
}

export default class EntityEditBase<T extends HasId> extends React.Component<
    RouteComponentProps<any>,
    IFormState<T>
> {
    protected entityLogic: EntityLogicBase<T>;
    protected tableURL: string;

    constructor(props: RouteComponentProps, entityLogic: EntityLogicBase<T>, tableURL: string) {
        super(props);
        this.entityLogic = entityLogic;
        this.tableURL = tableURL;

        this.state = {
            // The id will be undefined when creating a new item
            id: this.props.match.params.id,
            entity: {},
            loading: false,
            submitSuccess: false
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.entityLogic.getById(this.state.id).then(data => {
                this.setState({ entity: data });
            });
        }
    }

    protected processFormSubmission = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        const handleCompletion = (entity: T) => {
            console.log("Entity id: " + entity.id);
            this.setState({ submitSuccess: true, loading: false });
            setTimeout(() => {
                this.props.history.push(this.tableURL);
            }, 1000);
        };

        // Update the current item if the id is defined
        if (this.state.id) {
            this.entityLogic.update(this.state.entity as T).then(handleCompletion);
        } else {
            // Otherwise create a new item
            this.entityLogic.add(this.state.entity as T).then(handleCompletion);
        }
    };

    protected handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let entity: any = this.state.entity;
        entity[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ entity: entity });
    };
}
