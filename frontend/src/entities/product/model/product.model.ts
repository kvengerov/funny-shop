/**
 * Represents a commercial product in the shop's catalog.
 * Contains detailed information about pricing, description, and ratings.
 */
export interface Product {
    /** Unique numeric identifier for the product */
    id: number;

    /** Display title or name of the product */
    title: string;

    /** Market price in the system's currency */
    price: number;

    /** Extensive text description of the product's features */
    description: string;

    /** Taxonomic category the product belongs to */
    category: string;

    /** URL to the primary product image */
    image: string;

    /** Statistical rating data from user reviews */
    rating: {
        /** Average numerical rating (e.g., from 0 to 5) */
        rate: number;
        /** Total number of user reviews submitted */
        count: number;
    };
}
