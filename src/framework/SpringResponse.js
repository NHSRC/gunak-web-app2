class SpringResponse {
    static toReactAdminResourceListResponse(json, resource) {
        if (json["content"]) {
            return {
                data: json['content'],
                total: json["totalElements"]
            };
        } else if (json['_embedded']) {
            let resources = json['_embedded'][resource];
            let page = json['page'];
            return {
                data: resources,
                total: page["totalElements"]
            };
        }
    }
}

export default SpringResponse;