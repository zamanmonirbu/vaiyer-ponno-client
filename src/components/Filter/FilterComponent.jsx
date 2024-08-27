import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterComponent = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleOptionChange = (section, value) => {
        setSelectedOptions({ ...selectedOptions, [section]: value });
    };

    const sections = [
        { name: 'Customer Rating', options: ['Above 5', 'Above 4', 'Above 3', 'Above 2', 'Above 1'] },
        { name: 'Beyond Plastic™', options: ['Option 1', 'Option 2', 'Option 3'] },
        { name: 'Subscribe and Save', options: ['Yes', 'No'] },
        { name: 'Brand', options: ['Brand A', 'Brand B', 'Brand C'] },
        { name: 'Certifications', options: ['Certified A', 'Certified B', 'Certified C'] },
        { name: 'Star Ingredient', options: ['Ingredient A', 'Ingredient B', 'Ingredient C'] },
    ];

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            {sections.map((section) => (
                <div key={section.name} className="mb-4">
                    <div
                        onClick={() => toggleSection(section.name)}
                        className="text-xl font-bold cursor-pointer mb-2 flex items-center justify-between text-[#033B4C]"
                    >
                        <span>{section.name}</span>
                        {activeSection === section.name ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <hr className="border-t-2 border-[#033B4C] mb-2" /> {/* Strike line */}
                    {activeSection === section.name && (
                        <div className="ml-4">
                            {section.options.map((option) => (
                                <label key={option} className="block mb-2 text-xl text-[#033B4C]">
                                    <input
                                        type="radio"
                                        name={section.name}
                                        value={option}
                                        checked={selectedOptions[section.name] === option}
                                        onChange={() => handleOptionChange(section.name, option)}
                                        className="mr-3 w-6 h-6" // Larger radio input
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterComponent;
