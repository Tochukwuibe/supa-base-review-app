import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { URL, KEY } from './keys.js'
// Create a single supabase client for interacting with your database 
export const SuperBaseContext = React.createContext(createClient(URL, KEY));