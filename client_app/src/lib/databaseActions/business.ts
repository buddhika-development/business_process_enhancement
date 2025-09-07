import { NONAME } from "dns";
import { supabase } from "../supabase/supabaseClient";
import { createBusinessLandload } from "./landload";

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


export const createBusinessDetails = async (businessData: any) => {

    console.log(businessData)

    const { data, error } = await supabase
    .from('business_details')
    .insert([{ 
        business_name: businessData.businessName,
        business_type : businessData.businessType,
        business_category: businessData.businessCategory,
        business_address: businessData.businessAddress,
        business_city: businessData.businessCity,
        business_state: businessData.businessState,
        property_owned: businessData.propertyOwned,
        business_description: businessData.businessDescription
     }])
    .select()

    
    if(error) {
        console.log(`Something went wrong in business data insertion process. ${error}`)
        return null
    }
    
    if(businessData.propertyOwned != "owned"){
        const landloadId = createBusinessLandload(
            data[0].id,
            businessData.landlordNIC,
            businessData.landlordContact
        )

        console.log(landloadId)
    }

    return data[0].id

}