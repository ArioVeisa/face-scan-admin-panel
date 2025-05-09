
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Camera, History, CheckCheck, X } from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Mahasiswa",
      value: "1,234",
      description: "Terdaftar dalam sistem",
      icon: <Users className="h-5 w-5 text-primary" />,
      change: "+8% dari bulan lalu",
    },
    {
      title: "Deteksi Hari Ini",
      value: "156",
      description: "Pendeteksian wajah",
      icon: <Camera className="h-5 w-5 text-primary" />,
      change: "+12% dari kemarin",
    },
    {
      title: "Total Riwayat",
      value: "5,672",
      description: "Log deteksi tersimpan",
      icon: <History className="h-5 w-5 text-primary" />,
      change: "+3% dari minggu lalu",
    },
  ];

  // Recent detections
  const recentDetections = [
    {
      id: 1,
      timestamp: "Hari ini, 09:45",
      studentName: "Budi Santoso",
      studentId: "190041234",
      status: "match",
      accuracy: "98%",
    },
    {
      id: 2,
      timestamp: "Hari ini, 09:38",
      studentName: "Rina Wati",
      studentId: "190042345",
      status: "match",
      accuracy: "96%",
    },
    {
      id: 3,
      timestamp: "Hari ini, 09:32",
      studentName: "-",
      studentId: "-",
      status: "not_found",
      accuracy: "-",
    },
    {
      id: 4,
      timestamp: "Hari ini, 09:15",
      studentName: "Ahmad Farhan",
      studentId: "190043456",
      status: "match",
      accuracy: "95%",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Gambaran umum sistem deteksi wajah mahasiswa
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs mt-2 text-primary">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Detections */}
      <div>
        <h2 className="text-lg font-medium mb-4">Deteksi Terbaru</h2>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">Waktu</th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">Nama</th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">NIM</th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3.5 text-left text-sm font-semibold">Akurasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentDetections.map((detection) => (
                  <tr key={detection.id}>
                    <td className="px-4 py-3 text-sm">{detection.timestamp}</td>
                    <td className="px-4 py-3 text-sm">{detection.studentName}</td>
                    <td className="px-4 py-3 text-sm">{detection.studentId}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        {detection.status === "match" ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                            <span>Match</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                            <span>Not Found</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{detection.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" />
              <span>Match Rate</span>
            </CardTitle>
            <CardDescription>Tingkat keberhasilan deteksi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.2%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-green-500" style={{ width: "94.2%" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Diukur dari 1,245 deteksi dalam 30 hari terakhir
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              <span>Deteksi Gagal</span>
            </CardTitle>
            <CardDescription>Deteksi yang tidak menemukan kecocokan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5.8%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "5.8%" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Total 72 deteksi gagal dalam 30 hari terakhir
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
