import { CloudSun, Droplets, Wind, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WeatherWidget() {
    return (
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-blue-50">Farm Weather</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-4xl font-bold">24°C</div>
                        <div className="text-blue-100">Partly Cloudy</div>
                        <div className="text-sm text-blue-100 mt-1">California, USA</div>
                    </div>
                    <CloudSun className="h-16 w-16 text-yellow-300" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="bg-white/10 rounded-lg p-2">
                        <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-200" />
                        <div className="font-medium">65%</div>
                        <div className="text-xs text-blue-200">Humidity</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                        <Wind className="h-4 w-4 mx-auto mb-1 text-blue-200" />
                        <div className="font-medium">12km/h</div>
                        <div className="text-xs text-blue-200">Wind</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                        <Thermometer className="h-4 w-4 mx-auto mb-1 text-blue-200" />
                        <div className="font-medium">High</div>
                        <div className="text-xs text-blue-200">UV Index</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
