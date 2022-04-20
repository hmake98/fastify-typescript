import S from 'fluent-json-schema'

export const createPostSchema = {
    body: S.object().prop('content', S.string().required()),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
}