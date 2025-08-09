import { ReportGenerator } from "@/components/features/reports/report-generator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

const recentReports = [
  { id: "r1", name: "Monthly Spending - Oct 2023", type: "Spending by Category", date: "2023-11-01", format: "PDF" },
  { id: "r2", name: "Q3 Cash Flow Summary", type: "Cash Flow Statement", date: "2023-10-15", format: "CSV" },
  { id: "r3", name: "Net Worth Snapshot - Sep 2023", type: "Net Worth Report", date: "2023-10-01", format: "PDF" },
]

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <h1 className="text-3xl font-bold mb-6">Reports & Insights</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportGenerator />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Generated</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {recentReports.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No recent reports.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
