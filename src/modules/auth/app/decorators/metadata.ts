import { SetMetadata } from '@nestjs/common';

export const METADATA_KEY_PUBLIC = 'public';
export const Public = () => SetMetadata(METADATA_KEY_PUBLIC, true);
