import { Link } from "@inertiajs/react";
export default function Pagination({ links }) {
    return (
        links.length > 0 && (
            <div className="flex items-center justify-between mt-4">
                <div>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={
                                link.active
                                ? "bg-blue-500 hover:bg-blue-700 text-white m-2"
                                : "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 m-2"
                            }
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        )
    );
}
