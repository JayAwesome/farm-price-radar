import React from 'react';
import { CROPS } from '@/lib/data';
import { getPriceTrendStatus } from '@/lib/logic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  const [selectedCropId, setSelectedCropId] = React.useState(CROPS[0].id);
  const selectedCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];
  const trendStatus = getPriceTrendStatus(selectedCrop.trends);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border p-3 rounded-lg shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="text-sm font-bold text-primary">\u20A6{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Price Analytics</h2>
          <p className="text-muted-foreground">Deep dive into historical trends and market movements.</p>
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCropId} onValueChange={setSelectedCropId}>
            <SelectTrigger className="w-full bg-card">
              <SelectValue placeholder="Select a crop" />
            </SelectTrigger>
            <SelectContent>
              {CROPS.map(crop => (
                <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>Market Signal</CardTitle>
            <CardDescription>Current movement</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className={`p-4 rounded-full mb-4 ${
              trendStatus === 'rising' ? 'bg-primary/10 text-primary' : 
              trendStatus === 'falling' ? 'bg-destructive/10 text-destructive' : 
              'bg-muted text-muted-foreground'
            }`}>
              {trendStatus === 'rising' ? <TrendingUp className="h-10 w-10" /> : 
               trendStatus === 'falling' ? <TrendingDown className="h-10 w-10" /> : 
               <Minus className="h-10 w-10" />}
            </div>
            <div className="text-center">
              <Badge className={`mb-2 ${
                trendStatus === 'rising' ? 'bg-primary' : 
                trendStatus === 'falling' ? 'bg-destructive' : 
                'bg-muted text-foreground'
              }`}>
                {trendStatus.toUpperCase()}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {trendStatus === 'rising' ? 'Prices are gaining momentum. Good time to prepare harvest.' : 
                 trendStatus === 'falling' ? 'Prices are cooling down. Avoid immediate bulk selling.' : 
                 'Market is currently stable with minimal fluctuations.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-lg border-none">
          <CardHeader>
            <CardTitle>4-Week Price Trend (National Average)</CardTitle>
            <CardDescription>Price movement for {selectedCrop.name} across Nigerian markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedCrop.trends}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                    tickFormatter={(value) => `\u20A6${(value/1000)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Price Volatility Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-muted h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm font-bold">Medium</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Volatility is normal for this season. Typical price swing: 5-8% weekly.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Seasonal Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Historical data suggests that {selectedCrop.name.toLowerCase()} prices usually peak in the next 3 weeks due to harvest transitions in Northern Nigeria.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
