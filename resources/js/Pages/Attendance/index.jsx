import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Absensi
                </h2>
            }
        >
            <Head title="Attendances" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-3">
                        <label className="font-bold">
                            Total : {attendances.total}
                        </label>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black w-1/2">
                                            Alamat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map(({id, user, created_at, address, status}) => {
                                        return (
                                            <tr
                                                key={id}
                                                className="border-b odd:bg-white even:bg-slate-200"
                                            >
                                                <td className="px-6 py-4">
                                                    {created_at}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {status}
                                                </td>
                                                <td
                                                    cla
                                                    ssName="px-6 py-4"
                                                >
                                                    {address}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
