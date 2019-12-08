/**
 * A Client organization
 */
export interface Client {
    /**
     * Unique identifier for this entity.
     * This value can be undefined when the object is created
     */
    id?: number;
    /**
     * Company name
     */
    name: string;
    /**
     * Brief description of this company
     */
    description: string;
    /**
     * The main sector of this company
     */
    sector: string;
}