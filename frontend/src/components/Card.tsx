interface CardProps {
    color?: string;
    title: string;
    content: string;
    redirectUrl: string;
}

export const Card:React.FC<CardProps> = ({ 
    color,
    title, 
    content, 
    redirectUrl 

}) => {
    return (
        <div className={`rounded-25px w-100 bg-${color} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
            <h2 className="font-bold">{title}</h2>
            <h1 className="text-xl text-gray-700 font-bold">{content}</h1>

            <div className="flex justify-end">
                <a href= {redirectUrl}>Click me</a>
            </div>
        </div>
    );
}
    
