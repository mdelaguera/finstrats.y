"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Play, Info } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface Webhook {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  lastTriggered: string;
}

const dummyWebhooks: Webhook[] = [
  { id: "w1", name: "YNAB to Google Sheets", status: "active", lastTriggered: "2023-10-26 14:30" },
  { id: "w2", name: "New Transaction SMS Alert", status: "error", lastTriggered: "2023-10-25 09:15" },
  { id: "w3", name: "Budget Update to Slack", status: "inactive", lastTriggered: "N/A" },
]

export function WebhookManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Webhook Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-md font-semibold mb-2">Connected Bank Accounts</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Checking Account (***1234) - Connected</li>
            <li>Savings Account (***5678) - Connected</li>
            <li>Credit Card (***9012) - Disconnected <Button variant="link" className="h-auto p-0 ml-1">Reconnect</Button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Webhook Status</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyWebhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>{webhook.name}</TableCell>
                  <TableCell className="text-center">
                    {webhook.status === "active" && <Badge variant="secondary" className="bg-success-green/20 text-success-green">Active</Badge>}
                    {webhook.status === "inactive" && <Badge variant="secondary">Inactive</Badge>}
                    {webhook.status === "error" && <Badge variant="destructive">Error</Badge>}
                  </TableCell>
                  <TableCell>{webhook.lastTriggered}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" title="Test Webhook">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="View Logs">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Connection Logs</h3>
          <div className="border rounded-md p-4 h-40 overflow-y-auto text-sm bg-muted/20 text-muted-foreground">
            <p>[2023-10-26 14:30:01] Webhook 'YNAB to Google Sheets' triggered successfully.</p>
            <p>[2023-10-25 09:15:05] Webhook 'New Transaction SMS Alert' failed: API rate limit exceeded.</p>
            <p>[2023-10-25 09:00:00] Webhook 'YNAB to Google Sheets' triggered successfully.</p>
            <p>[2023-10-24 18:00:00] Webhook 'New Transaction SMS Alert' triggered successfully.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
