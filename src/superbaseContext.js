import { createClient } from '@supabase/supabase-js'
import { URL, KEY } from './keys.js'

export const superbase = createClient(URL, KEY);