import React from "react";
import {
    Card,
    Button,
    Input,
    Divider,
    Modal,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DatePicker,
} from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTasks } from "../hooks/useTasks";
import { FiPlus, FiCheckCircle, FiCalendar } from "react-icons/fi";
import SpaceBackground from "../components/SpaceBackground";
import {
    now,
    getLocalTimeZone,
    parseAbsoluteToLocal,
} from "@internationalized/date";

function getRelativeDays(center: Date, range: number = 3) {
    // Returns an array of days, with the central day and previous/next days
    const days = [];
    for (let i = -range; i <= range; i++) {
        const d = new Date(center);
        d.setDate(center.getDate() + i);
        days.push(d);
    }
    return days;
}

function getTaskDay(task: any) {
    if (!task.date) return null;
    const date = new Date(task.date);
    return date.toLocaleDateString("en-CA");
}

function CalendarViewContent() {
    const { tasks, loading, error, addTask, isAdding } = useTasks();

    let [date, setDate] = React.useState(
        parseAbsoluteToLocal(new Date().toISOString()),
    );

    // Default current date and time
    const [newTask, setNewTask] = React.useState({
        title: "",
        description: "",
    });
    const [message, setMessage] = React.useState("");
    const today = new Date();
    const [centerDay, setCenterDay] = React.useState<Date>(today);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const days = getRelativeDays(centerDay, 2); // 5 days, today in the center

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Convert DateValue to UTC string
            const dateTimeUTC = date ? date.toAbsoluteString() : "";
            await addTask({ ...newTask, date: dateTimeUTC });
            setMessage("Task added");
            setNewTask({ title: "", description: "" });
            setDate(parseAbsoluteToLocal(new Date().toISOString()));
            onOpenChange(); // Close modal
        } catch {
            setMessage("Error adding task");
        }
    };

    return (
        <div className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
            <SpaceBackground />
            <main className="relative z-10 flex flex-col items-center max-w-7xl mx-auto p-10">
                {/* Circular calendar */}
                <section className="w-full flex flex-col items-center">
                    <h2 className="text-4xl font-bold mb-8 text-white text-center tracking-tight">
                        Calendar
                    </h2>
                    {error ? (
                        <div className="mb-8">
                            <p className="text-red-400 text-center">{String(error)}</p>
                        </div>
                    ) : loading ? (
                        <div className="mb-8 flex items-center justify-center w-full min-h-[160px]">
                            <p className="text-blue-300 text-center text-lg">Loading...</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                color="secondary"
                                className="rounded-full px-3 py-2"
                                onPress={() =>
                                    setCenterDay((prev) => {
                                        const d = new Date(prev);
                                        d.setDate(prev.getDate() - 1);
                                        return d;
                                    })
                                }
                            >
                                &#8592;
                            </Button>
                            <div className="grid grid-cols-5 gap-4">
                                {days.map((day, idx) => {
                                    const dayISO = day.toLocaleDateString("en-CA");
                                    const dayTasks = tasks.filter(
                                        (t) => getTaskDay(t) === dayISO,
                                    );
                                    const isToday =
                                        day.toDateString() === today.toDateString();
                                    return (
                                        <Card
                                            key={idx}
                                            className={`p-4 min-h-[160px] flex flex-col bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl hover:scale-[1.03] transition-transform ${isToday ? "border-2 border-green-400 scale-[1.08] z-10" : ""}`}
                                        >
                                            <h3
                                                className={`font-semibold text-center mb-2 text-lg flex items-center justify-center gap-2 ${isToday ? "text-green-400" : "text-white"}`}
                                            >
                                                <FiCalendar className="inline text-indigo-300" />
                                                {day.toLocaleDateString("es-ES", {
                                                    weekday: "short",
                                                    day: "numeric",
                                                })}
                                            </h3>
                                            <Divider className="mb-2" />
                                            <ul className="flex-1">
                                                {dayTasks.length === 0 ? (
                                                    <li className="text-gray-300 text-sm text-center">
                                                        No tasks
                                                    </li>
                                                ) : (
                                                    dayTasks.map((t) => (
                                                        <li
                                                            key={t.id}
                                                            className="bg-white/30 p-2 my-1 rounded-lg shadow flex flex-col gap-1 border border-white/20"
                                                        >
                                                            <span className="font-bold text-base text-indigo-900 flex items-center gap-1">
                                                                <FiCheckCircle className="text-green-400" />
                                                                {t.title}
                                                            </span>
                                                            <p className="text-sm text-gray-700">
                                                                {t.description}
                                                            </p>
                                                            <span className="text-xs text-indigo-700 font-mono">
                                                                {new Date(
                                                                    t.date,
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    },
                                                                )}
                                                            </span>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </Card>
                                    );
                                })}
                            </div>
                            <Button
                                color="secondary"
                                className="rounded-full px-3 py-2"
                                onPress={() =>
                                    setCenterDay((prev) => {
                                        const d = new Date(prev);
                                        d.setDate(prev.getDate() + 1);
                                        return d;
                                    })
                                }
                            >
                                &#8594;
                            </Button>
                        </div>
                    )}
                    <Button
                        onPress={onOpen}
                        color="primary"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <FiPlus /> Add task
                    </Button>
                </section>

                {/* Modal to add task */}
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    backdrop="blur"
                    size="md"
                    radius="lg"
                    shadow="lg"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>
                                    <h2 className="text-2xl font-bold text-indigo-900">
                                        New Task
                                    </h2>
                                </ModalHeader>
                                <ModalBody>
                                    <form
                                        onSubmit={handleAddTask}
                                        className="flex flex-col gap-2"
                                    >
                                        <Input
                                            label="Title"
                                            value={newTask.title}
                                            onChange={(e) =>
                                                setNewTask({
                                                    ...newTask,
                                                    title: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        <Input
                                            label="Description"
                                            value={newTask.description}
                                            onChange={(e) =>
                                                setNewTask({
                                                    ...newTask,
                                                    description: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        <DatePicker
                                            granularity="minute"
                                            hideTimeZone
                                            showMonthAndYearPickers
                                            minValue={now(getLocalTimeZone())}
                                            label="Date and time"
                                            value={date}
                                            onChange={(value) => {
                                                if (value) setDate(value);
                                            }}
                                            variant="bordered"
                                        />
                                        {isAdding && (
                                            <p className="text-blue-300 mt-2 text-center animate-pulse">
                                                Adding task...
                                            </p>
                                        )}
                                        {message && (
                                            <p className="text-green-400 mt-2 text-center font-semibold animate-fadein">
                                                {message}
                                            </p>
                                        )}
                                        <Button
                                            type="submit"
                                            color="primary"
                                            className="w-full mb-2 flex items-center gap-2 text-lg font-semibold"
                                            disabled={isAdding}
                                        >
                                            <FiPlus /> Add
                                        </Button>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant="light"
                                        color="secondary"
                                        onPress={onClose}
                                        className="w-full"
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </main>
        </div>
    );
}

const queryClient = new QueryClient();

export default function CalendarView() {
    return (
        <QueryClientProvider client={queryClient}>
            <CalendarViewContent />
        </QueryClientProvider>
    );
}
