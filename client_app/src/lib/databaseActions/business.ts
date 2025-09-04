import { supabase } from "../supabase/supabaseClient";

export const getAllBusinessDetails = async () => {
    try {
        const { data: business_details, error } = await supabase
            .from('business_details')
            .select('*')
        if (error) {
            throw new Error('Error fetching business details');
        }

        return business_details;
    } catch (error) {
        console.error('Error fetching business details:', error);
        throw error;
    }
};

export const getBusinessDetailsById = async (businessId: string) => {
    const { data: business_details, error } = await supabase
        .from('business_details')
        .select('*')
        .eq('id', businessId)
        .single();

    if (error) {
        return null;
    }

    return business_details;
};

export const getBusinessDetailsByName = async (businessName: string) => {
    const { data: business_details, error } = await supabase
        .from('business_details')
        .select('*')
        .eq('business_name', businessName)
        .single();

    if (error) {
        return null;
    }
    
    return business_details;
};