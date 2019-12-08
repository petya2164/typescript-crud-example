/**
 * A Contact person who represents a Client organization
 */
export interface Contact {
    /**
     * Unique identifier for this entity.
     * This value can be undefined when the object is created
     */
    id?: number;
    /**
     * First name
     */
    firstName: string;
    /**
     * Last name
     */
    lastName: string;
    /**
     * Role in the Client organization
     */
    role: string;
    /**
     * Email address.
     * This string value would require proper validation
     */
    email: string;
    /**
     * Phone number.
     * This string value would require proper validation
     */
    phone: string;
    /**
     * Identifier of the Client organization represented by this Contact
     * This value would require a ClientPicker UI element with proper validation
     */
    clientId?: number;
}
