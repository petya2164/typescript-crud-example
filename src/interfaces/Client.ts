import { HasId } from "./HasId";

/**
 * A Client organization
 */
export interface Client extends HasId {
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
