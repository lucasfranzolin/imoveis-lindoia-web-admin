import { useCallback, useState } from 'react';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const usePagination = (initialSort) => {
    const [sortBy, setSortBy] = useState(initialSort);
    const [order, setOrder] = useState(1);
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

    const sort = useCallback(
        (field) => {
            const isSameField = field === sortBy;
            setOrder(isSameField ? order * -1 : 1);
            setSortBy(field);
        },
        [order, sortBy]
    );

    return {
        onNavigate,
        order,
        page,
        pageSize,
        reset,
        setPageSize,
        sortBy,
        sort,
    };
};
