import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { HasId } from "../interfaces/HasId";
import { EntityLogicBase } from "../businessLogic/EntityLogicBase";

interface IState<T extends HasId> {
    entities: T[];
    errorMessage?: string;
}

export default abstract class EntityTableBase<T extends HasId> extends React.Component<
    RouteComponentProps,
    IState<T>
> {
    protected entityLogic: EntityLogicBase<T>;

    constructor(props: RouteComponentProps, entityLogic: EntityLogicBase<T>) {
        super(props);
        this.entityLogic = entityLogic;
        this.state = { entities: [], errorMessage: undefined };
    }

    abstract getEntityLabel(): string;

    abstract getEntityLabelPlural(): string;

    abstract getEditURL(): string;

    abstract renderTableHeader(): JSX.Element;

    abstract renderTableRow(entity: T): JSX.Element;

    public componentDidMount(): void {
        this.loadEntities();
    }

    public async loadEntities() {
        try {
            const data = await this.entityLogic.getAll();
            this.setState({ entities: data });
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: error.message });
        }
    }

    public async deleteEntity(id: number) {
        try {
            await this.entityLogic.delete(id);
            // Get a copy of this.state.entities
            let entities = this.state.entities.slice();
            const index = entities.findIndex(entity => entity.id === id);
            entities.splice(index, 1);
            this.setState({ entities: entities, errorMessage: undefined });
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: error.message });
        }
    }

    public async generateEntity() {
        try {
            let random: T = await this.entityLogic.generateRandom();
            let entity: T = await this.entityLogic.add(random);

            console.log("Random entity added");
            console.log(entity);
            // Get a copy of this.state.entities
            let entities = this.state.entities.slice();
            entities.push(entity);
            this.setState({ entities: entities, errorMessage: undefined });
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: error.message });
        }
    }

    public render() {
        const { entities, errorMessage } = this.state;
        return (
            <div className="container">
                <br />
                <div className="text-center">
                    <h2>{this.getEntityLabelPlural()}</h2>
                </div>

                <div className="btn-toolbar">
                    <Link to={this.getEditURL()} className="btn btn-success mr-2">
                        Create New {this.getEntityLabel()}
                    </Link>
                    <button className="btn btn-primary" onClick={() => this.generateEntity()}>
                        Generate Random {this.getEntityLabel()}
                    </button>
                </div>

                {entities.length === 0 && (
                    <div className="text-center">
                        <h3>No {this.getEntityLabelPlural()} found at the moment</h3>
                    </div>
                )}

                {errorMessage !== undefined && (
                    <div className="alert alert-danger" role="alert">
                        Error occurred: {errorMessage}
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>{this.renderTableHeader()}</tr>
                            </thead>
                            <tbody>
                                {entities &&
                                    entities.map(entity => (
                                        <tr key={entity.id}>
                                            {this.renderTableRow(entity)}
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-toolbar">
                                                        <Link
                                                            to={`${this.getEditURL()}/${entity.id}`}
                                                            className="btn btn-sm btn-outline-secondary mr-1"
                                                        >
                                                            Edit {this.getEntityLabel()}
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() =>
                                                                this.deleteEntity(entity.id!)
                                                            }
                                                        >
                                                            Delete {this.getEntityLabel()}
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
