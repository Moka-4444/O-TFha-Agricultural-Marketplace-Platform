import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Map, Sprout, Droplets, Thermometer, MoreHorizontal, Clock } from 'lucide-react';

export default function MyFarmPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">My Farm</h1>
                <Button className="gap-2 bg-green-700 hover:bg-green-800">
                    <Sprout className="h-4 w-4" /> Add Field
                </Button>
            </div>

            {/* Farm Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Area</CardTitle>
                        <Map className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 acres</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                        <Sprout className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                        <Droplets className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                        <Thermometer className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">72°F</div>
                    </CardContent>
                </Card>
            </div>

            {/* My Fields */}
            <Card>
                <CardHeader>
                    <CardTitle>My Fields</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                    {[
                        { name: 'Field A - North', size: '5 acres', crop: 'Winter Wheat', health: 'Excellent', planted: '2024-10-01', progress: 45 },
                        { name: 'Field B - South', size: '3 acres', crop: 'Corn', health: 'Good', planted: '2024-09-15', progress: 70 },
                        { name: 'Field C - East', size: '4 acres', crop: 'Soybeans', health: 'In Progress', planted: 'N/A', progress: 10 },
                    ].map((field, i) => (
                        <div key={i} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold">{field.name}</div>
                                    <div className="text-xs text-muted-foreground">{field.size}</div>
                                </div>
                                <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">Active</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground text-xs">Crop:</span>
                                    <div className="font-medium">{field.crop}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground text-xs">Health:</span>
                                    <div className="font-medium">{field.health}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground text-xs">Planted:</span>
                                    <div className="font-medium">{field.planted}</div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span>Growth Progress</span>
                                    <span>{field.progress}%</span>
                                </div>
                                <Progress value={field.progress} className="h-2 bg-green-100 [&>div]:bg-green-600" />
                            </div>

                            <Button variant="outline" className="w-full text-xs h-8">View Details</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Soil Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Soil Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Field</TableHead>
                                <TableHead>pH Level</TableHead>
                                <TableHead>Nitrogen</TableHead>
                                <TableHead>Phosphorus</TableHead>
                                <TableHead>Potassium</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { field: 'Field A', ph: '6.5', n: 'High', p: 'Medium', k: 'High', status: 'Good' },
                                { field: 'Field B', ph: '6.2', n: 'Medium', p: 'Low', k: 'Medium', status: 'Needs Attention' },
                                { field: 'Field C', ph: '6.8', n: 'High', p: 'High', k: 'High', status: 'Excellent' },
                            ].map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{row.field}</TableCell>
                                    <TableCell>{row.ph}</TableCell>
                                    <TableCell className="text-green-600">{row.n}</TableCell>
                                    <TableCell className={row.p === 'Low' ? 'text-red-600' : 'text-green-600'}>{row.p}</TableCell>
                                    <TableCell className="text-green-600">{row.k}</TableCell>
                                    <TableCell>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.status === 'Good' || row.status === 'Excellent' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Request Test</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Irrigation Schedule */}
            <Card>
                <CardHeader>
                    <CardTitle>Irrigation Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { day: 'Monday', time: '6:00 AM - 8:00 AM' },
                            { day: 'Wednesday', time: '6:00 AM - 8:00 AM' },
                            { day: 'Friday', time: '6:00 AM - 8:00 AM' },
                        ].map((schedule, i) => (
                            <div key={i} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <Clock className="h-5 w-5 text-blue-600 mr-3" />
                                <div>
                                    <div className="font-medium text-blue-900">{schedule.day}</div>
                                    <div className="text-xs text-blue-700">{schedule.time}</div>
                                </div>
                                <Droplets className="h-4 w-4 text-blue-400 ml-auto" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
