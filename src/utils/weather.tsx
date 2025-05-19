

export const getWeatherGradient = (condition: string) => {
    switch (condition) {
        case "Sunny":
            return "from-blue-400 via-sky-300 to-yellow-300"
        case "nuvoloso":
            return "from-blue-500 via-blue-400 to-gray-300"
        case "Moderate rain":
            return "from-blue-700 via-blue-500 to-blue-300"
        case "Patchy rain nearby":
            return "from-blue-700 via-blue-500 to-blue-300"
        case "temporale":
            return "from-gray-800 via-purple-700 to-blue-500"
        case "nevoso":
            return "from-blue-300 via-blue-200 to-gray-100"
        case "nebbioso":
            return "from-gray-400 via-gray-300 to-gray-200"
        default:
            return "from-blue-500 via-blue-400 to-blue-300"
    }
}