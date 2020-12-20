import React from 'react'
import { createClient } from '@supabase/supabase-js'
const URL = "https://kxpepfmrmxfgsntkhufl.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYwODM0MjY5MywiZXhwIjoxOTIzOTE4NjkzfQ.z9qg3fyT_Z6bO96wBddlAPeSj4S3lSYcYLkzh9S-zLY";

// Create a single supabase client for interacting with your database 
export const SuperBaseContext = React.createContext(createClient(URL, KEY));