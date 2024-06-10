import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DynamicTopicsFieldProps {
    name: string;
    control: Control<any>;
    isPending: boolean;
}

const DynamicTopicsField: React.FC<DynamicTopicsFieldProps> = ({ name, control, isPending }) => {
    const [topic, setTopic] = useState("");
    const { setValue, getValues } = useFormContext();

    const handleAddTopic = () => {
        if (topic.trim() === "") return;
        const currentTopics: string[] = getValues(name) || [];
        setValue(name, [...currentTopics, topic.trim()]);
        setTopic("");
    };

    return (
        <div>
            <label className="block text-sm font-medium text-white">Relevant Topics</label>
            <div className="flex space-x-2 mt-2">
                <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isPending}
                    placeholder="Type a topic"
                    className='rounded-full hover:border-purple-500 focus:border-purple-500'
                />
                <Button
                    type="button"
                    onClick={handleAddTopic}
                    disabled={isPending}
                    className='rounded-full'
                >
                    Add
                </Button>
            </div>
            <ul className="mt-4 space-y-2">
                {getValues(name)?.map((t: string, index: number) => (
                    <li key={index} className="bg-gray-800 px-3 py-1 rounded-full text-white">
                        {t}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DynamicTopicsField;
