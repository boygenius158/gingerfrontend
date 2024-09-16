'use client';

import { createEdgeStoreProvider } from '@edgestore/react';

// Since JavaScript doesn't have types, you don't need to specify `EdgeStoreRouter` type.
const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider();

export { EdgeStoreProvider, useEdgeStore };
