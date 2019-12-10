import { HasId } from "./HasId";

/**
 * A meeting for a Client organization
 */
export interface ClientMeeting extends HasId {
    /**
     * Meeting title
     */
    title: string;
    /**
     * Agenda for this meeting
     */
    agenda: string;
    /**
     * Start date for this meeting
     * This value could be a JS Date if we implement a DatePicker UI element with proper validation
     */
    startDate: string;
    /**
     * End date for this meeting
     * This value could be a JS Date if we implement a DatePicker UI element with proper validation
     */
    endDate: string;
    /**
     * Identifier of the Client organization that has this meeting
     * This value would require a ClientPicker UI element with proper validation
     */
    clientId?: number;
    /**
     * Identifier of the Location where this meeting takes place
     * This value would require a LocationPicker UI element with proper validation
     */
    locationId?: number;
    /**
     * Identifiers of the Contacts that are invited to this meeting
     * This value would require a ContactPicker UI element with proper validation
     */
    contactIds?: number[];
}
