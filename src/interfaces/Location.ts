/**
 * A Location is a place of business for a Client organization
 */
export interface Location {
    /**
     * Unique identifier for this entity.
     * This value can be undefined when the object is created
     */
    id?: number;
    /**
     * Short name of this Location
     */
    name: string;
    /**
     * Brief description of this Location
     */
    description: string;
    /**
     * The full address of this Location
     */
    address: string;
    /**
     * Identifier of the Client organization that uses this Location
     * This value would require a ClientPicker UI element with proper validation
     */
    clientId?: number;
}
