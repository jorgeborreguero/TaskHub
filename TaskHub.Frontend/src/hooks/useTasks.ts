import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask } from "../api/tasks";

export function useTasks() {
    const queryClient = useQueryClient();
    const {
        data: tasks = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const addTask = async (newTask: {
        title: string;
        description: string;
        date: string;
    }) => {
        await mutation.mutateAsync(newTask);
    };

    return {
        tasks,
        loading: isLoading,
        error,
        addTask,
        isAdding: mutation.isPending,
    };
}
