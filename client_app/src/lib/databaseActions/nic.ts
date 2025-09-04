import { supabase } from "../supabase/supabaseClient";

export const allNICDetails = async () => {
    try {
        const { data: nic_details, error } = await supabase
            .from('nic_details')
            .select('*')

        if (error) {
            throw new Error('Error fetching NIC details');
        }

        return nic_details;
    } catch (error) {
        console.error('Error fetching NIC details:', error);
        throw error;
    }
};


export const getNICDetailsByNumber = async (nicNumber: string) => {
    const { data: nic_details, error } = await supabase
        .from('nic_details')
        .select('*')
        .eq('nic_number', nicNumber)
        .single();

    if (error) {
        return null;
    }

    return nic_details;
};