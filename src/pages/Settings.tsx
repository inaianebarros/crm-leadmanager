import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Moon, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as preferências do sistema</p>
      </div>

      <div className="grid gap-4">
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <CardTitle>Preferências Gerais</CardTitle>
            </div>
            <CardDescription>Configure as opções gerais do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Modo Escuro
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ativar tema escuro para a interface
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas sobre novos leads
                </p>
              </div>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="language" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Idioma Português
                </Label>
                <p className="text-sm text-muted-foreground">
                  Usar português brasileiro como idioma padrão
                </p>
              </div>
              <Switch id="language" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
