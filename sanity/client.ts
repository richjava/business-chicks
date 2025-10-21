import {createClient} from '@sanity/client'
import { getSanityConfig } from '@/sanity/config';

export const client = createClient(getSanityConfig())