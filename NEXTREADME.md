## getServerSideProps

You want to use the logic that's in your API route directly in getServerSideProps, rather than calling your internal API. That's because getServerSideProps runs on the server just like the API routes (making a request from the server to the server itself would be pointless). You can read from the filesystem or access a database directly from getServerSideProps. Note that this only applies to calls to internal API routes - it's perfectly fine to call external APIs from getServerSideProps.
