import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { HasId } from "../interfaces/HasId";
import { EntityLogicBase } from "../businessLogic/EntityLogicBase";

export interface IFormState<T extends HasId> {
    id: number;
    entity: Partial<T>;
    submitSuccess: boolean;
    loading: boolean;
    errorMessage?: string;
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
            submitSuccess: false,
            errorMessage: undefined
        };
    }

    public componentDidMount(): void {
        // Retrieve current item if the id is defined
        if (this.state.id) {
            this.loadEntity();
        }
    }

    public async loadEntity() {
        try {
            const data = await this.entityLogic.getById(this.state.id);
            this.setState({ entity: data });
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: error.message });
        }
    }

    protected processFormSubmission = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });

        try {
            // Update the current item if the id is defined
            let entity: T;
            if (this.state.id) {
                entity = await this.entityLogic.update(this.state.entity as T);
            } else {
                // Otherwise create a new item
                entity = await this.entityLogic.add(this.state.entity as T);
            }
            console.log("Entity id: " + entity.id);
            this.setState({ submitSuccess: true, loading: false });
            // Redirect back to the table if everything went fine
            setTimeout(() => {
                this.props.history.push(this.tableURL);
            }, 1000);
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: error.message, submitSuccess: false, loading: false });
        }
    };

    protected handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        let entity: any = this.state.entity;
        entity[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ entity: entity });
    };

    protected renderInfoMessage(): JSX.Element {
        const { submitSuccess, errorMessage } = this.state;
        return (
            <React.Fragment>
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        Operation has completed successfully!{" "}
                    </div>
                )}
                {errorMessage !== undefined && (
                    <div className="alert alert-danger" role="alert">
                        Error occurred: {errorMessage}
                    </div>
                )}
            </React.Fragment>
        );
    }
}
