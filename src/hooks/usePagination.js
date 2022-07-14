import { useState } from 'react';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const usePagination = () => {
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const getCandidatePage = (candidate) =>
        candidate >= DEFAULT_PAGE ? candidate : DEFAULT_PAGE;

    const onNavigate = (page) => {
        setPage(getCandidatePage(page));
    };

    const reset = () => {
        setPage(DEFAULT_PAGE);
    };

    return {
        page,
        pageSize,
        setPageSize,
        onNavigate,
        reset,
    };
};
