import { supabase } from '../lib/supabase'

const checkTableExists = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Table check error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    return false;
  }
  return true;
};

export const createLead = async (leadData) => {
  console.log('Attempting to create lead with data:', leadData);
  
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Database connection not initialized');
    }

    // Check if table exists
    const tableExists = await checkTableExists();
    if (!tableExists) {
      throw new Error('Leads table does not exist. Please run the table creation SQL.');
    }

    // Log the exact data being sent to Supabase
    const leadRecord = {
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      email: leadData.email,
      company: leadData.company,
      message: leadData.message,
      status: 'new',
      created_at: new Date().toISOString()
    };
    
    console.log('Inserting lead record:', leadRecord);

    // Attempt to insert the lead
    const { data, error } = await supabase
      .from('leads')
      .insert([leadRecord])
      .select();

    if (error) {
      console.error('Supabase insert error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        statusCode: error.status || 'unknown'
      });
      
      // Provide more specific error messages
      if (error.code === '42P01') {
        throw new Error('Leads table does not exist');
      } else if (error.code === '23505') {
        throw new Error('A lead with this email already exists');
      } else if (error.code === '23502') {
        throw new Error('Missing required fields');
      } else if (error.code === '42703') {
        throw new Error('Invalid column name in the data');
      } else if (error.status === 401) {
        throw new Error('Not authorized to insert leads');
      } else {
        throw new Error(`Database error: ${error.message || 'Unknown error'} (Code: ${error.code || 'unknown'})`);
      }
    }

    console.log('Lead created successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error creating lead:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return { 
      data: null, 
      error: error.message || 'Failed to create lead. Please try again.' 
    };
  }
}
