import { useState } from 'react';

interface Task {
    email: string | null | undefined,
    id: string,
    title: string,
    created: number,
    completed: boolean,
}

const useFilter = (data: Task[]) => {
    const [filteredData, setFilteredData] = useState<Task[]>(data);

    const filterData = (searchTerm: string) => {
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredData(filtered);
    };

    return { filteredData, filterData };
};

export default useFilter;