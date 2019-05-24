import auth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';

export const existDocument = async documentUri => {
    return await auth.fetch(documentUri, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const createDocument = async (documentUri, body = '') => {
    try {
        return await auth.fetch(documentUri, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/sparql-update',
            },
            body,
        });
    } catch (e) {
        throw e;
    }
};

export const createNonExistentDocument = async (documentUri, body = '') => {
    try {
        const result = await existDocument(documentUri);
        return result.status === 404
            ? createDocument(documentUri, body)
            : false;
    } catch (e) {
        throw e;
    }
};

export const fetchLdflexDocument = async documentUri => {
    try {
        const result = await existDocument(documentUri);
        if (result.status === 404) throw new Error('404: Document not found');
        const document = await ldflex[documentUri];
        return document;
    } catch (e) {
        throw e;
    }
};
